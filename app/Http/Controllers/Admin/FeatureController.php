<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use App\Models\Plan;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function index()
    {
        $features = Feature::with('plan')->get();
        return view('admin.features.index', compact('features'));
    }

    public function create()
    {
        $plans = Plan::all();
        return view('admin.features.create', compact('plans'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'name' => 'required',
        ]);

        Feature::create($request->all());
        return redirect()->route('admin.features.index');
    }

    public function edit(Feature $feature)
    {
        $plans = Plan::all();
        return view('admin.features.edit', compact('feature', 'plans'));
    }

    public function update(Request $request, Feature $feature)
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
            'name' => 'required',
        ]);

        $feature->update($request->all());
        return redirect()->route('admin.features.index');
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();
        return redirect()->route('admin.features.index');
    }
}
