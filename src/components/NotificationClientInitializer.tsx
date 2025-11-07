"use client"; 
import usePushNotifications from '@/hooks/usePushNotifications';
import React from 'react'; 

const NotificationClientInitializer: React.FC = () => { 

  const { currentToken } = usePushNotifications(); 

  if (currentToken) { 
    console.log("FCM Token está activo y registrado en NestJS."); 
  }

  return null; 
}

export default NotificationClientInitializer;