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
        Schema::table('patients', function (Blueprint $table) {
            if (!Schema::hasColumn('patients', 'blood_type')) {
                $table->string('blood_type')->nullable();
            }
            if (!Schema::hasColumn('patients', 'height')) {
                $table->string('height')->nullable();
            }
            if (!Schema::hasColumn('patients', 'weight')) {
                $table->string('weight')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            //
        });
    }
};