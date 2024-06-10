<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phoneNumber', 'plan_id'];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
