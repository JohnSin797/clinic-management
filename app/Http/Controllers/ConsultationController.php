<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consultation;
use App\Http\Requests\Consultation\StoreRequest;
use Illuminate\Support\Facades\DB;

class ConsultationController extends Controller
{
    public function index()
    {
        $consultations = Consultation::join('patients', 'patients.id', '=', 'consultations.patient_id')
            ->select(
                DB::raw('CONCAT(patients.first_name, " ", patients.last_name) as name'),
                'patients.employment_status',
                'patients.department',
                'consultations.date_created',
                'patients.id_number'
            )
            ->get();
        if ($consultations) {
            return response()->json([
                'message' => 'OK',
                'consultations' => $consultations
            ], 200);
        }
        return response()->json([
            'message' => 'Consultations not found'
        ], 500);
    }

    public function store(StoreRequest $request)
    {
        $validated = $request->validated();
        $patient = Patient::find($validated['patient_id']);
        $patient->update([
            'blood_type' => $validated['blood_type'],
            'height' => $validated['height'],
            'weight' => $validated['weight'],
            'food_allergy' => $validated['food_allergy'],
            'medicine_allergy' => $validated['medicine_allergy'],
            'other_allergy' => $validated['other_allergy'],
        ]);
        $result = Consultation::create($validated);
        if ($result) {
            return response()->json([
                'message' => 'Consultation successfully created!'
            ], 200);
        }
        return response()->json([
            'message' => 'Failed to create Consultation'
        ], 500);
    }
}
