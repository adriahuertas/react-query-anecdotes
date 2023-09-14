import { createContext, useContext, useEffect, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
          return action.data
        case 'CLEAR_NOTIFICATION':
          return null
        default:
          return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");
   // Set up a timer to clear the notification after a certain time
   useEffect(() => {
    let timer;

    if (notification) {
      timer = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000); // Clear notification after 5 seconds
    }

    return () => clearTimeout(timer); // Clean up the timer on unmount or when the notification changes
  }, [notification]);

    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)

    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    console.log("PROVA", notificationAndDispatch)    
    return notificationAndDispatch[1]
}

export default NotificationContext