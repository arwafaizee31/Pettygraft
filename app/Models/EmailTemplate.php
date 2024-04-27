<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailTemplate extends Model
{
    use HasFactory;
    use SoftDeletes;

    public static function get_by_slug($slug)
    {
        $data = self::where('slug', $slug)->first();
        if (is_object($data)) {
            $data->body = str_replace('"/storage', '"'.env('APP_URL').'/storage', $data->body);
        }
        return $data;
    }

    public static function get_master_template()
    {
        return view('emails.body')->render();
    }
}
