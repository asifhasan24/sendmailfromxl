
// function listDrafts() {
//   const drafts = GmailApp.getDrafts();
//   drafts.forEach(draft => {
//     Logger.log(`Subject: ${draft.getMessage().getSubject()} | Draft ID: ${draft.getId()}`);
//   });
// }




function sendEmailsWithLabel() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = sheet.getDataRange().getValues();
  
  // Specify the draft ID of your email template
  const templateDraftId = 'r5807884351378055534'; // Replace with your template draft ID
  const templateDraft = GmailApp.getDraft(templateDraftId);
  const templateMessage = templateDraft.getMessage();
  const subjectTemplate = templateMessage.getSubject();
  const bodyTemplate = templateMessage.getBody();

  // Define the label name
  const labelName = "PhD Student for Fall 2025 - Artificial Intelligence and Machine Learning"; // Replace with your preferred label name
  let label = GmailApp.getUserLabelByName(labelName);
  
  // Create the label if it doesn’t exist
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }

  // Loop through each row, skipping the header (index 0)
  for (let i = 1; i < data.length; i++) {
    const emailAddress = data[i][0]; // Email column

    // Send the email using the template's subject, body, and existing attachment
    const sentEmail = GmailApp.sendEmail(emailAddress, subjectTemplate, "", {
      htmlBody: bodyTemplate,
      attachments: templateMessage.getAttachments()  // Attach existing attachments from the draft
    });
    
    // Apply the label to the sent email
    const thread = GmailApp.search(`to:${emailAddress} subject:${subjectTemplate}`)[0];
    if (thread) {
      thread.addLabel(label);
    }
  }

  Logger.log("Emails sent and labeled successfully.");
}
