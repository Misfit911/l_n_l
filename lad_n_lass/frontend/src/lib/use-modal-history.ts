"use client";

import { useEffect, useId, useRef } from "react";

type Slot = { priority: number; close: () => void };

const slots = new Map<string, Slot>();
let historyDepth = 0;
let ignorePops = 0;
let flushHandle = 0;

function topSlot(): Slot | undefined {
  let top: Slot | undefined;
  for (const slot of slots.values()) {
    if (!top || slot.priority >= top.priority) top = slot;
  }
  return top;
}

function onPopState() {
  if (ignorePops > 0) {
    ignorePops -= 1;
    return;
  }
  if (slots.size === 0) return;
  historyDepth = Math.max(0, historyDepth - 1);
  topSlot()?.close();
}

function flushHistory() {
  flushHandle = 0;
  const want = slots.size;
  const delta = want - historyDepth;
  if (delta > 0) {
    for (let i = 0; i < delta; i += 1) window.history.pushState({ ahaModal: 1 }, "");
    historyDepth = want;
    return;
  }
  if (delta < 0 && window.history.state?.ahaModal) {
    ignorePops += -delta;
    historyDepth = want;
    window.history.go(delta);
    return;
  }
  historyDepth = want;
}

function scheduleFlush() {
  if (flushHandle || typeof window === "undefined") return;
  flushHandle = window.requestAnimationFrame(flushHistory);
}

/** Push a history entry while `open` so the browser back button closes this layer first. */
export function useModalHistory(open: boolean, close: () => void, priority: number) {
  const id = useId();
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    window.removeEventListener("popstate", onPopState);
    window.addEventListener("popstate", onPopState);
    if (!open) {
      if (slots.delete(id)) scheduleFlush();
      return;
    }
    slots.set(id, { priority, close: () => closeRef.current() });
    scheduleFlush();
    return () => {
      if (slots.delete(id)) scheduleFlush();
    };
  }, [open, id, priority]);
}
