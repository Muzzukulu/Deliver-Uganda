<?php
return [
    'defaults' => ['guard' => 'client', 'passwords' => 'clients'],
    'guards' => [
        'client' => ['driver' => 'session','provider' => 'clients'],
        'transporter' => ['driver' => 'session','provider' => 'transporters'],
        'admin' => ['driver' => 'session','provider' => 'admins'],
        'client-api' => ['driver' => 'sanctum','provider' => 'clients'],
        'transporter-api' => ['driver' => 'sanctum','provider' => 'transporters'],
    ],
    'providers' => [
        'clients' => ['driver' => 'eloquent','model' => App\Models\Client::class],
        'transporters' => ['driver' => 'eloquent','model' => App\Models\Transporter::class],
        'admins' => ['driver' => 'eloquent','model' => App\Models\Admin::class],
    ],
    'passwords' => [
        'clients' => ['provider' => 'clients','table' => 'password_reset_tokens','expire' => 60],
        'transporters' => ['provider' => 'transporters','table' => 'password_reset_tokens','expire' => 60],
        'admins' => ['provider' => 'admins','table' => 'password_reset_tokens','expire' => 60],
    ],
];