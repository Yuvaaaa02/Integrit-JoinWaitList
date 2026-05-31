import { GOOGLE_SCRIPT_URL } from '../config/api'

/**
 * Submit a waitlist entry to Google Sheets via Apps Script.
 * Uses no-cors mode — assume success on fetch completion.
 */
export const submitToGoogleSheets = async (formData) => {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      joinedAt: new Date().toISOString(),
    }),
  })

  return true
}

/**
 * Fetch all waitlist users from Google Sheets via GET request.
 */
export const fetchUsers = async () => {
  const response = await fetch(GOOGLE_SCRIPT_URL)
  const data = await response.json()
  return data
}
