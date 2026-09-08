export function VisaIcon({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="36" height="24" rx="3" fill="#1434CB" />
      <path
        d="M14.6 16.5L16.2 6.5H18.7L17.1 16.5H14.6ZM23.4 6.7C22.9 6.5 22.1 6.3 21.1 6.3C18.6 6.3 16.8 7.6 16.8 9.5C16.8 10.9 18 11.7 19 12.2C19.9 12.7 20.3 13 20.3 13.5C20.3 14.2 19.4 14.6 18.6 14.6C17.6 14.6 17 14.4 16.2 14.1L15.8 13.9L15.4 16.3C16.1 16.6 17.3 16.9 18.5 16.9C21.2 16.9 22.9 15.6 22.9 13.6C22.9 12 21.9 11.1 20.5 10.4C19.6 10 19 9.7 19 9.1C19 8.6 19.6 8.1 20.7 8.1C21.6 8.1 22.3 8.3 22.8 8.5L23.1 8.6L23.4 6.7ZM29.2 6.5H27.3C26.7 6.5 26.2 6.7 26 7.2L22.2 16.5H24.8L25.3 15.1H28.4L28.7 16.5H31L29.2 6.5ZM26 13.2L27.3 9.6L28 13.2H26ZM12.9 6.5L10.5 13.3L10.2 11.9C9.7 10.2 8.3 8.3 6.7 7.4L9 16.5H11.7L15.6 6.5H12.9Z"
        fill="white"
      />
      <path
        d="M8.2 6.5H5.1L5 6.7C7.4 7.3 9.5 9 10.5 11.9L9.7 7.6C9.5 6.8 8.9 6.5 8.2 6.5Z"
        fill="#F9A01B"
      />
    </svg>
  );
}

export function MastercardIcon({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="36" height="24" rx="3" fill="#222222" />
      <circle cx="14" cy="12" r="6.5" fill="#EB001B" />
      <circle cx="22" cy="12" r="6.5" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

export function AmexIcon({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="36" height="24" rx="3" fill="#006FCF" />
      <path
        d="M7 16.5L9.3 11L11.6 16.5H14.1L10.7 8.5H7.9L4.5 16.5H7ZM8.5 13.3H10.1L9.3 11.3L8.5 13.3ZM14.7 16.5H17.2V11.2L19.2 16.5H21.3L23.3 11.2V16.5H25.8V8.5H22.5L20.3 13.7L18.1 8.5H14.7V16.5ZM27.1 16.5H33.5V14.5H29.5V13.3H33.2V11.4H29.5V10.5H33.5V8.5H27.1V16.5Z"
        fill="white"
      />
    </svg>
  );
}

export function ApplePayIcon({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="36" height="24" rx="3" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
      <path
        d="M12.4 11.2C12.4 9.9 13.2 9.2 13.2 9.2C12.6 8.3 11.6 8.2 11.2 8.1C10.3 8 9.4 8.6 9 8.6C8.5 8.6 7.8 8.1 7.1 8.1C6.1 8.1 5.2 8.7 4.7 9.6C3.6 11.5 4.5 14.3 5.5 15.8C6 16.6 6.6 17.4 7.4 17.4C8.2 17.4 8.5 16.9 9.5 16.9C10.5 16.9 10.7 17.4 11.6 17.4C12.4 17.4 12.9 16.6 13.4 15.9C14 15 14.3 14.2 14.3 14.1C14.2 14.1 12.4 13.4 12.4 11.2ZM11 7.4C11.4 6.9 11.7 6.1 11.6 5.4C10.9 5.4 10.1 5.9 9.6 6.4C9.2 6.9 8.9 7.7 9 8.4C9.8 8.5 10.6 7.9 11 7.4ZM16.3 17.4H17.8V13.2H20.1C22 13.2 23.3 11.9 23.3 10.1C23.3 8.3 22 7.1 20.1 7.1H16.3V17.4ZM17.8 11.9V8.4H20C21.1 8.4 21.8 9.1 21.8 10.1C21.8 11.2 21.1 11.9 20 11.9H17.8ZM24 16.5C24.4 17.1 25.1 17.5 25.9 17.5C27.1 17.5 28.1 16.6 28.1 15.3V11.2H26.7V14.9C26.7 15.8 26.2 16.3 25.4 16.3C24.7 16.3 24.3 15.8 24.3 15V11.2H22.9V15.4C22.9 15.8 23.4 16.2 24 16.5ZM28.8 18.7C29.8 18.7 30.3 18.3 30.8 17.1L33.3 11.2H31.7L30.1 15.6L28.6 11.2H27L29.3 17.1L28.6 18.7H28.8Z"
        fill="#000000"
      />
    </svg>
  );
}

export function GooglePayIcon({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="36" height="24" rx="3" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
      <path
        d="M14.2 12.1C14.2 11.6 14.1 11.1 14 10.7H9.2V12.6H12C11.9 13.3 11.5 13.9 10.9 14.3V15.7H12.7C13.7 14.7 14.2 13.5 14.2 12.1Z"
        fill="#4285F4"
      />
      <path
        d="M9.2 17.2C10.6 17.2 11.7 16.7 12.7 15.7L10.9 14.3C10.4 14.6 9.8 14.8 9.2 14.8C7.9 14.8 6.8 13.9 6.4 12.7H4.5V14.2C5.5 16.1 7.2 17.2 9.2 17.2Z"
        fill="#34A853"
      />
      <path
        d="M6.4 12.7C6.2 12.1 6.2 11.5 6.4 10.9V9.4H4.5C3.8 10.8 3.8 12.8 4.5 14.2L6.4 12.7Z"
        fill="#FBBC04"
      />
      <path
        d="M9.2 8.8C10 8.8 10.7 9.1 11.2 9.6L12.7 8.1C11.7 7.2 10.5 6.7 9.2 6.7C7.2 6.7 5.5 7.8 4.5 9.7L6.4 11.2C6.8 10 7.9 8.8 9.2 8.8Z"
        fill="#EA4335"
      />
      <path
        d="M17.5 16.5V10.2H19.1V11.1H19.2C19.5 10.5 20.3 10 21.1 10C22.7 10 23.6 11 23.6 12.7V16.5H22V13C22 12 21.4 11.4 20.5 11.4C19.7 11.4 19.1 12 19.1 12.8V16.5H17.5ZM27.4 16.6C26.1 16.6 25.1 15.6 25.1 14.3C25.1 13 26.1 12 27.4 12C28.7 12 29.7 13 29.7 14.3C29.7 15.6 28.7 16.6 27.4 16.6ZM27.4 13.3C26.8 13.3 26.4 13.8 26.4 14.3C26.4 14.8 26.8 15.3 27.4 15.3C28 15.3 28.4 14.8 28.4 14.3C28.4 13.8 28 13.3 27.4 13.3Z"
        fill="#5F6368"
      />
    </svg>
  );
}

/**
 * Only advertise payment methods that are actually enabled on the account.
 * Showing wallet badges for methods we cannot accept is a card-network
 * compliance violation and a common reason for onboarding rejection.
 *
 * Set `showWallets` once Apple Pay / Google Pay are live on the Airwallex
 * account.
 */
export default function PaymentBadges({
  className = "",
  showSsl = true,
  showWallets = false,
}: {
  className?: string;
  showSsl?: boolean;
  showWallets?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="h-6 w-9 overflow-hidden rounded border border-line/80 bg-paper shadow-xs transition hover:scale-105">
        <VisaIcon className="h-full w-full object-cover" />
      </div>
      <div className="h-6 w-9 overflow-hidden rounded border border-line/80 bg-paper shadow-xs transition hover:scale-105">
        <MastercardIcon className="h-full w-full object-cover" />
      </div>
      <div className="h-6 w-9 overflow-hidden rounded border border-line/80 bg-paper shadow-xs transition hover:scale-105">
        <AmexIcon className="h-full w-full object-cover" />
      </div>
      {showWallets && (
        <>
          <div className="h-6 w-9 overflow-hidden rounded border border-line/80 bg-paper shadow-xs transition hover:scale-105">
            <ApplePayIcon className="h-full w-full object-cover" />
          </div>
          <div className="h-6 w-9 overflow-hidden rounded border border-line/80 bg-paper shadow-xs transition hover:scale-105">
            <GooglePayIcon className="h-full w-full object-cover" />
          </div>
        </>
      )}
      {showSsl && (
        <span className="ml-1.5 flex items-center gap-1 text-[11px] font-semibold text-muted">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          SSL Secured
        </span>
      )}
    </div>
  );
}
