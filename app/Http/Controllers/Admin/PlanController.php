<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Service;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::with('service')->get();
        return view('admin.plans.index', compact('plans'));
    }

    public function create()
    {
        $services = Service::all();
        return view('admin.plans.create', compact('services'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required',
        ]);

        Plan::create($request->all());
        return redirect()->route('admin.plans.index');
    }

    public function edit(Plan $plan)
    {
        $services = Service::all();
        return view('admin.plans.edit', compact('plan', 'services'));
    }

    public function update(Request $request, Plan $plan)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required',
        ]);

        $plan->update($request->all());
        return redirect()->route('admin.plans.index');
    }

    public function destroy(Plan $plan)
    {
        $plan->delete();
        return redirect()->route('admin.plans.index');
    }
}
