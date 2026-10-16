import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSiteSettings } from '@/services/settings';

export const WhatsAppButton: React.FC = () => {
  const location = useLocation();
  const [whatsappNumber, setWhatsappNumber] = useState('923000000000');

  useEffect(() => {
    getSiteSettings().then((settings) => {
      if (settings?.whatsapp) {
        // Strip non-digit characters for the wa.me link
        const clean = settings.whatsapp.replace(/\D/g, '');
        if (clean) setWhatsappNumber(clean);
      }
    });
  }, []);

  // Hide on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Support Floating Actions">
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat on WhatsApp with INSPIRE School admissions office"
      >
        {/* Official WhatsApp SVG */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.956.562 3.782 1.534 5.336L2 22l4.805-1.503c1.49.88 3.224 1.385 5.226 1.385 5.536 0 10.031-4.495 10.031-10.031C22.062 6.495 17.567 2 12.031 2zm0 18.25c-1.748 0-3.37-.506-4.739-1.378l-.34-.216-3.14.981.982-3.07-.234-.372c-.958-1.517-1.47-3.27-1.47-5.164 0-4.962 4.038-9 9-9s9 4.038 9 9-4.038 9-9 9zm4.935-6.732c-.27-.135-1.602-.79-1.85-.88-.248-.09-.428-.135-.608.135-.18.27-.698.88-.856 1.06-.158.18-.315.203-.585.068-.27-.135-1.14-.42-2.172-1.34-.803-.716-1.345-1.6-1.503-1.87-.158-.27-.017-.416.118-.55.122-.121.27-.315.405-.473.135-.158.18-.27.27-.45.09-.18.045-.338-.023-.473-.067-.135-.608-1.463-.833-2.003-.219-.526-.441-.454-.608-.463l-.518-.01c-.18 0-.473.068-.72.338-.248.27-.946.924-.946 2.253 0 1.329.968 2.613 1.103 2.793.135.18 1.905 2.909 4.615 4.078.645.279 1.149.445 1.542.57.648.206 1.238.177 1.704.107.52-.078 1.602-.655 1.827-1.286.225-.631.225-1.172.158-1.286-.068-.113-.248-.18-.518-.315z" />
        </svg>
      </a>
    </aside>
  );
};
