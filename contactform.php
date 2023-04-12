<?php
#<form method="POST" action="process-form.php">
#<!-- input fields go here -->
#<button type="submit" name="submit">Submit</button>
</form>
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $fname = $_POST['fname'];
  $lname = $_POST['lname'];
  $email = $_POST['email'];
  $description = $_POST['description'];
  $checklist = implode(', ', $_POST['checklist']);

  $to = 'nigelaustin.blount@gmail.com';
  $subject = 'New Contact Form Submission';
  $message = "Name: $fname $lname\nEmail: $email\nDescription: $description\nChecklist: $checklist";
  $headers = "From: $email\r\n" .
             "Reply-To: $email\r\n" .
             "X-Mailer: PHP/" . phpversion();

  if (mail($to, $subject, $message, $headers)) {
    echo 'Thank you for your submission!';
  } else {
    echo 'There was an error submitting the form. Please try again.';
  }
}
?>