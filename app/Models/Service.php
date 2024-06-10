<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['name', 'description'];

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }
}

class Plan extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'name', 'description'];

    public function features()
    {
        return $this->hasMany(Feature::class);
    }
}

class Feature extends Model
{
    use HasFactory;

    protected $fillable = ['plan_id', 'name'];
}
