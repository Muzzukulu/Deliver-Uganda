<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Client extends Authenticatable {
    use HasFactory, HasApiTokens;
    protected $fillable = ['name','phone','email','password','default_gps_lat','default_gps_lng'];
    protected $hidden = ['password'];
}