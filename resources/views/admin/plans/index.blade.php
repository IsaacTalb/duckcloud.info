@extends('admin.admin_master')

@section('admin')
<div class="container">
    <h1>Plans</h1>
    <a href="{{ route('admin.plans.create') }}" class="btn btn-primary">Add Plan</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($plans as $plan)
            <tr>
                <td>{{ $plan->id }}</td>
                <td>{{ $plan->service->name }}</td>
                <td>{{ $plan->name }}</td>
                <td>
                    <a href="{{ route('admin.plans.edit', $plan->id) }}" class="btn btn-warning">Edit</a>
                    <form action="{{ route('admin.plans.destroy', $plan->id) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
