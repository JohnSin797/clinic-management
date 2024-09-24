<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consultation;
use App\Models\Patient;
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
                'consultations.created_at',
                'patients.id_number',
                'consultations.id'
            )
            ->get();
        return response()->json([
            'message' => 'OK',
            'consultations' => $consultations
        ], 200);
    }

    public function show($id)
    {
        $consultation = Consultation::find($id);

        if (!$consultation) {
            return response()->json([
                'message' => 'Consultation not found'
            ]);
        }

        return response()->json([
            'consultation' => $consultation
        ]);
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
        $result = Consultation::create([
            'patient_id' => $validated['patient_id'],
            'blood_type' => $validated['blood_type'],
            'height' => $validated['height'],
            'weight' => $validated['weight'],
            'food_allergy' => json_encode($validated['food_allergy']),
            'medicine_allergy' => json_encode($validated['medicine_allergy']),
            'other_allergy' => json_encode($validated['other_allergy']),
            'is_pregnant' => $validated['is_pregnant'],
            'is_disabled' => $validated['is_disabled'],
            'past_present_illness' => $validated['past_present_illness'],
            'illness' => $validated['illness'],
            'is_operated' => $validated['is_operated'],
            'date_of_operation' => $validated['date_of_operation'],
            'type_of_operation' => $validated['type_of_operation'],
            'hospital_name_operation' => $validated['hospital_name_operation'],
            'is_hospitalized' => $validated['is_hospitalized'],
            'hospital_name_confined' => $validated['hospital_name_confined'],
            'physician' => $validated['physician'],
            'diagnosis' => $validated['diagnosis'],
        ]);
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
