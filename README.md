# Gmail Template Email Sender with Label

This Google Apps Script sends emails based on a draft template, attaches any existing attachments from the draft, and labels each sent email in Gmail. Recipients' email addresses are read from a Google Sheets file.

## Requirements

- Google Sheets with a list of recipient emails
- Gmail draft template for the email subject, body, and attachment
- A Gmail label (existing or to be created by the script) to apply to each sent email

## Setup

1. **Set Up the Google Sheet**:
   - Create a Google Sheet with a sheet named `"EmailRecipients"`.
   - In the first column, add recipient email addresses (you may add more columns if desired, but only the first column is required for this script).

2. **Create a Draft Email in Gmail**:
   - Compose an email in Gmail with the desired subject, body, and any attachments.
   - Save this as a draft. The script will use this draft as a template.

3. **Get the Draft ID**:
   - Open the Google Apps Script editor by navigating to **Extensions > Apps Script** in your Google Sheets file.
   - Run the following code to log all draft IDs. Copy the ID of the draft you created for use in the main script.

   ```javascript
   function listDrafts() {
     const drafts = GmailApp.getDrafts();
     drafts.forEach(draft => {
       Logger.log(`Subject: ${draft.getMessage().getSubject()} | Draft ID: ${draft.getId()}`);
     });
   }
