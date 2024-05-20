<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReplyToContactForm extends Mailable
{
    use Queueable, SerializesModels;

    public $replyMessage;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($replyMessage)
    {
        $this->replyMessage = $replyMessage;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reply to your contact message')
                    ->view('emails.reply_to_contact_form')
                    ->with(['replyMessage' => $this->replyMessage]);
    }
}
