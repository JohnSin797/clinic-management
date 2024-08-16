<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('id_number')->unique();
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->string('extension')->nullable();
            $table->date('date_of_birth');
            $table->string('employment_status')->default('student');
            $table->string('department');
            $table->string('address');
            $table->string('father_name')->nullable();
            $table->string('father_occupation')->nullable();
            $table->date('father_date_of_birth')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_occupation')->nullable();
            $table->date('mother_date_of_birth')->nullable();
            $table->string('person_to_contact_name')->nullable();
            $table->string('person_to_contact_number')->nullable();
            $table->string('other_person_to_contact_name')->nullable();
            $table->string('other_person_to_contact_number')->nullable();
            $table->string('relation_to_other_person')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
