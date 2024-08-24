<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactReply extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_form_id',
        'message',
    ];

    public function contactForm()
    {
        return $this->belongsTo(ContactForm::class);
    }
}
