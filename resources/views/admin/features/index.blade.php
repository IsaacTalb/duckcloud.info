@extends('admin.admin_master')

@section('admin')
<div class="container">
    <h1>Features</h1>
    <a href="{{ route('admin.features.create') }}" class="btn btn-primary">Add Feature</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Plan</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($features as $feature)
            <tr>
                <td>{{ $feature->id }}</td>
                <td>{{ $feature->plan->name }}</td>
                <td>{{ $feature->name }}</td>
                <td>
                    <a href="{{ route('admin.features.edit', $feature->id) }}" class="btn btn-warning">Edit</a>
                    <form action="{{ route('admin.features.destroy', $feature->id) }}" method="POST" style="display:inline;">
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
