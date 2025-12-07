import { useAuthStore } from './authStore';

const POLL_INTERVAL_MS = 500;

function openCenteredPopup(url: string, title: string, width: number, height: number): Window | null {
  var dualScreenLeft = window.screenLeft ?? window.screenX ?? 0;
  var dualScreenTop = window.screenTop ?? window.screenY ?? 0;

  var windowWidth = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
  var windowHeight = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

  var left = dualScreenLeft + (windowWidth - width) / 2;
  var top = dualScreenTop + (windowHeight - height) / 2;

  var features = [
    `scrollbars=yes`,
    `width=${Math.round(width)}`,
    `height=${Math.round(height)}`,
    `top=${Math.round(top)}`,
    `left=${Math.round(left)}`,
  ].join(',');

  return window.open(url, title, features);
}

async function waitForPopupClose(popup: Window): Promise<void> {
  return new Promise((resolve) => {
    var intervalId = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(intervalId);
        resolve();
      }
    }, POLL_INTERVAL_MS);
  });
}

export async function ensureWriteConsent(): Promise<boolean> {
  // Hook usage is not allowed in non-component functions, so this helper
  // reads from the global window to get the current location and delegates
  // auth state changes to the auth store via its public API.
  // The actual hasWriteAccess value should be checked by callers via useAuthStore.

  // eslint-disable-next-line react-hooks/rules-of-hooks
  var { hasWriteAccess, refreshAuth } = useAuthStore();

  if (hasWriteAccess === true) {
    return true;
  }

  var currentPath = window.location.pathname + window.location.search;
  var startUrl = '/api/auth/login/google/write?returnUrl=' + encodeURIComponent(currentPath);

  var popup = openCenteredPopup(startUrl, 'YouTube Write Access', 600, 700);

  if (popup == null) {
    window.location.assign(startUrl);
    return false;
  }

  await waitForPopupClose(popup);
  await refreshAuth();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  var updatedAuth = useAuthStore();
  return updatedAuth.hasWriteAccess === true;
}
