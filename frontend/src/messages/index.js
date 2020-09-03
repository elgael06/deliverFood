
export default function showNotification({body='',tag=''}) {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(tag, {
            body ,
            icon: './icon_round_1.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag,
          });
        });
      }
    });
  }