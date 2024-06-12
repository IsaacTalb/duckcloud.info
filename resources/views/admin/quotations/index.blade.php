@extends('admin.admin_master')

@section('admin')
<div class="content">
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Quotations</h3>
            </div>
            <div class="card-body">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Plan</th>
                            <th>Created At</th>
                            <th>Actions</th> <!-- Add a new column for actions -->
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($quotations as $quotation)
                            <tr>
                                <td>{{ $quotation->company }}</td>
                                <td>{{ $quotation->name }}</td>
                                <td>{{ $quotation->email }}</td>
                                <td>{{ $quotation->phone_number }}</td>
                                <td>{{ $quotation->plan }}</td>
                                <td>{{ $quotation->created_at }}</td>
                                <td>
                                    <!-- Reply Button -->
                                    <a href="{{ route('admin.reply', $quotation->id) }}" class="btn btn-primary">Check Status</a>
                                    <!-- Delete Button -->
                                    <form action="{{ route('admin.delete', $quotation->id) }}" method="POST">
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
        </div>
    </div>
</div>
@endsection
