export const getMobileOperatingSystem = (): string => {
  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent || navigator.vendor;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "unknown";
}
