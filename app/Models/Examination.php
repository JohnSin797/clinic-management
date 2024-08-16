<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Examination extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'medical_history',
        'family_history',
        'occupational_history',
        'physical_examintation',
        'blood_pressure',
        'temperature',
        'is_impaired_hearing',
        'with_glasses',
        'left_eye',
        'right_eye',
        'chest_x_ray',
        'chest_x_ray_findings',
        'complete_blood_count',
        'routine_urinalysis',
        'fecalysis_stool_examination',
        'hepatitis_b_screening',
        'drug_test'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id', 'id');
    }
}
