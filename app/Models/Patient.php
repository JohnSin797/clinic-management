<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_number', 
        'first_name',
        'middle_name', 
        'last_name', 
        'extension',
        'date_of_birth', 
        'employment_status',
        'department',
        'address',
        'father_name',
        'father_occupation',
        'father_date_of_birth',
        'mother_name',
        'mother_occupation',
        'mother_date_of_birth',
        'person_to_contact_name',
        'person_to_contact_number',
        'other_person_to_contact_name',
        'other_person_to_contact_number',
        'relation_to_other_person',
        'last_visit',
        'blood_type',
        'height',
        'weight',
        'food_allergy',
        'medicine_allergy',
        'other_allergy',
    ];

    protected $casts = [
        'food_allergy' => 'array',
        'medicine_allergy' => 'array',
        'other_allergy' => 'array',
    ];

    public function consultations()
    {
        return $this->hasMany(Consultation::class, 'patient_id', 'id');
    }
}
