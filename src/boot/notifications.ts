export async function checkNotificationPermission() {
  if (!('Notification' in window)) return
  if (Notification.permission === 'default' && window.confirm('Would you like to enable notification alerts?')) {
    await Notification.requestPermission()
  }
}
