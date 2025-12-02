import { useEffect } from 'react';

export const LiveChat = () => {
  useEffect(() => {
    // Tawk.to Live Chat Integration
    // Replace with your actual Tawk.to property ID
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

// Alternative: Intercom Integration
/*
export const LiveChat = () => {
  useEffect(() => {
    (window as any).Intercom('boot', {
      app_id: 'YOUR_INTERCOM_APP_ID',
      // Optional: Pre-fill user data
      name: 'Visitor',
      email: '',
      created_at: new Date().getTime()
    });

    return () => {
      (window as any).Intercom('shutdown');
    };
  }, []);

  return null;
};
*/

// To use Intercom, add this to your index.html <head>:
/*
<script>
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/YOUR_APP_ID';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
*/
