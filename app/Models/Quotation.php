<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'company', 'name', 'email', 'phone_number', 'plan',
    ];

    public function sendReply($replyMessage)
    {
        // Send an email to the user with the provided reply message
    }
}
