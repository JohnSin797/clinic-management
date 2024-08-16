<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'blood_type',
        'height',
        'weight',
        'food_allergy',
        'medicine_allergy',
        'other_allergy',
        'is_pregnant',
        'is_disabled',
        'past_present_illness',
        'illness',
        'is_operated',
        'date_of_operation',
        'type_of_operation',
        'hospital_name_operation',
        'is_hospitalized',
        'hospital_name_confined',
        'physician',
        'diagnosis'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id', 'id');
    }
}
