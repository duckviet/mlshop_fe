import axios from "axios";

export const EVENT_TYPES = {
  VIEW: 0,
  ADD_TO_CART: 1,
  BUY: 2,
} as const;

interface Event {
  aid: string;
  ts: number;
  type: number;
}

interface SessionData {
  session_id: string;
  current_events: Event[];
}

const STORAGE_KEY = "user_events";

const getSessionData = (): SessionData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data)
    : { session_id: Date.now().toString(), current_events: [] };
};

const saveSessionData = (data: SessionData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const trackEvent = async (aid: string, type: number) => {
  try {
    // Get current session data
    const sessionData = getSessionData();

    // Add new event
    const newEvent: Event = {
      aid,
      ts: Date.now(),
      type,
    };

    sessionData.current_events.push(newEvent);

    // Save updated session data
    saveSessionData(sessionData);

    // Send to API
    await axios.post("/api/events", {
      session_id: sessionData.session_id,
      current_events: sessionData.current_events,
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};

export const getCurrentEvents = (): SessionData => {
  return getSessionData();
};

export const clearEvents = () => {
  localStorage.removeItem(STORAGE_KEY);
};
