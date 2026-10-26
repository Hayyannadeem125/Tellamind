export const inquiryEndpoint = import.meta.env?.VITE_INQUIRY_WEBHOOK_URL || import.meta.env?.VITE_FORMSPREE_ENDPOINT;

export async function submitInquiry(data, {
  webhookUrl = import.meta.env?.VITE_INQUIRY_WEBHOOK_URL,
  formspreeUrl = import.meta.env?.VITE_FORMSPREE_ENDPOINT,
  fetchImpl = fetch,
} = {}) {
  const url = webhookUrl || formspreeUrl;
  if (!url) throw new Error('No inquiry service is configured.');
  let body = data;
  if (webhookUrl) {
    if (!data.get('requestId')) data.set('requestId', crypto.randomUUID());
    // URL-encoded form data avoids an unnecessary preflight on Apps Script.
    body = new URLSearchParams(Array.from(data.entries(), ([key, value]) => [key, String(value)]));
  }
  const response = await fetchImpl(url, {method: 'POST', body, headers: {Accept: 'application/json'}});
  if (!response.ok) throw new Error('The inquiry service did not accept this submission.');
  if (webhookUrl) {
    const result = await response.json();
    if (result.ok !== true) throw new Error('The inquiry was not saved.');
  }
}
