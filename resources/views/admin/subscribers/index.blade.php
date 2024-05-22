<!-- resources/views/admin/subscribers/index.blade.php -->

@extends('admin.admin_master')

@section('admin')
<div class="content-wrapper" style="background-color: #333637ab;">
    <div class="content">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Newsletter Subscribers</h3>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subscription Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($subscribers as $subscriber)
                        <tr>
                            <td>{{ $subscriber->id }}</td>
                            <td>{{ $subscriber->name }}</td>
                            <td>{{ $subscriber->email }}</td>
                            <td>{{ $subscriber->created_at }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection
