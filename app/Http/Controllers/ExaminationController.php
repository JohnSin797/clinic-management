<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Examination;

class ExaminationController extends Controller
{
    public function index()
    {
        $examinations = Examination::join('patients', 'patients.id', '=', 'examinations.patient_id')
        ->select(
            DB::raw('CONCAT(patients.first_name, " ", patients.middle_name, " ", patients.last_name, " ", patients.extension) as name'),
            'patients.employment_status',
            'patients.department',
            'examinations.created_at'
        )->get();

        if ($examinations) {
            return response()->json([
                'message' => 'OK',
                'examinations' => $examinations
            ], 200);
        }

        return response()->json(['message' => 'Failed to get examinations'], 500);
    }
}
