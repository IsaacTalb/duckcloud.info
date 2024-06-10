@extends('admin.admin_master')

@section('admin')
<div class="container">
    <h1>Services</h1>
    <a href="{{ route('admin.services.create') }}" class="btn btn-primary">Add Service</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($services as $service)
            <tr>
                <td>{{ $service->id }}</td>
                <td>{{ $service->name }}</td>
                <td>{{ $service->description }}</td>
                <td>
                    <a href="{{ route('admin.services.edit', $service->id) }}" class="btn btn-warning">Edit</a>
                    <form action="{{ route('admin.services.destroy', $service->id) }}" method="POST" style="display:inline;">
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
