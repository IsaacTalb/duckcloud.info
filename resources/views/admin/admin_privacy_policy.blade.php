@extends('admin.admin_master')

@section('admin')

<div class="py-12">
    <div class="container">
        <h4 style="text-align:center; color:white; margin-bottom:2em;">Admin — Privacy Policy Section </h4>
        <div class="row">
            <a href="{{ route('add.privacy.policy') }}"> <button class="btn btn-info">Add Privacy Policy</button> </a>
            <br><br>
            <div class="col-md-12">
                <div class="card">
                    @if(session('success'))
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{{ session('success') }}</strong>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    @endif
                    <div class="card-header"> All Privacy Policy Data </div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" width="5%">SL</th>
                                <th scope="col" width="15%">Title</th>
                                <th scope="col" width="25%">Photo</th>
                                <th scope="col" width="35%">Text</th>
                                <th scope="col" width="20%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php($i = 1)
                            @foreach($privacyPolicies as $policy)
                                <tr>
                                    <th scope="row">{{ $i++ }}</th>
                                    <td>{{ $policy->title }}</td>
                                    <td><img src="{{ $policy->photo }}" style="height: 40px; width: 70px;"></td>
                                    <td>{{ Str::limit($policy->text, 50) }}</td>
                                    <td>
                                        <a href="{{ url('admin/privacy-policy/edit/'.$policy->id) }}" class="btn btn-info">Edit</a>
                                        <a href="{{ route('delete.privacy.policy', $policy->id) }}" onclick="return confirm('Are you sure to delete?')" class="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
