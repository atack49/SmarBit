"use client";
import { useEffect, useState } from 'react'; 
import { getToken, onMessage, MessagePayload, Messaging } from 'firebase/messaging'; 
import { messaging } from '../firebase'; 
const VAPID_KEY = "BPzSfJR2C1nVdv9CfVQR4bSUQiKvBBS-u0lfGXRSsnqLDWbUQR3nfHBa23W9eX7wFeciucR0x3fz5fQX9tKEkj4"; 
const API_URL = "https://myfitguide.duckdns.org/MyFitGuide/notifications/register-token"; 

interface RegisterTokenDto {
  userId: string;
  fcmToken: string;
}

const getPersistentUserId = (): string | null => { 
  if (typeof window !== 'undefined' && window.localStorage) { 
    let id = localStorage.getItem('guest_fcm_id'); 
    if (!id) { 
      id = `guest_${Date.now()}_${Math.random().toString(36).substring(2)}`; 
      localStorage.setItem('guest_fcm_id', id); 
    }
    return id; 
  }
  return null; 
};

const usePushNotifications = () => { 
  const [currentToken, setCurrentToken] = useState<string | null>(null); 
  const [userId, setUserId] = useState<string | null>(null); 
  const sendTokenToBackend = async (id: string, token: string): Promise<void> => { 
    if (!id || !token) return; 
    try { 
      const body: RegisterTokenDto = { userId: id, fcmToken: token };
      await fetch(API_URL, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(body), 
      });
      console.log("Token enviado a NestJS y guardado (ID:", id, ")."); 
    } catch (error) { 
      console.error("Fallo al enviar el token a NestJS:", error); 
    }
  }; 

  const requestNotificationPermission = async (currentUserId: string): Promise<void> => { 
    if (!messaging || !currentUserId) { 
      console.warn("Messaging o UserID no están disponibles."); 
      return; 
    }

    try { 
      const permission = await Notification.requestPermission();
      if (permission === 'granted') { 
        const token = await getToken(messaging, { vapidKey: VAPID_KEY }); 
        setCurrentToken(token); 

        if (token) { 
          await sendTokenToBackend(currentUserId, token); 
        }

      } else { 
        console.warn("Permiso de notificación denegado."); 
      }
    } catch (error) { 
      console.error("Error al obtener el token:", error); 
    }
  }; 

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      const persistentId = getPersistentUserId(); 
      setUserId(persistentId);

      if (messaging && persistentId) {
        requestNotificationPermission(persistentId); 
        
     //   const unsubscribe = onMessage(messaging, (payload: MessagePayload) => { 
       //   console.log('Mensaje en primer plano recibido:', payload); 
         // alert(`Nueva Notificación: ${payload.notification?.title} - ${payload.notification?.body}`); 
       // });

        //return () => unsubscribe(); 
      }
    } 
  }, []); 

  return { currentToken, userId }; 
};

export default usePushNotifications; 