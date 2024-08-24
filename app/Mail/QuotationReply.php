<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class QuotationReply extends Mailable
{
    use Queueable, SerializesModels;

    public $replyMessage;
    public $pdfPath;

    public function __construct($replyMessage, $pdfPath)
    {
        $this->replyMessage = $replyMessage;
        $this->pdfPath = $pdfPath;
    }

    public function build()
    {
        return $this->subject('Your Quotation Request Has Been Received')
                    ->markdown('admin.reply')
                    ->attach($this->pdfPath);
    }
}
