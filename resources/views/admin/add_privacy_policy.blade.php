@extends('admin.admin_master')

@section('admin')
    <div class="py-12">
        <div class="container">
            <h4>Add Privacy Policy</h4>
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <form action="{{ route('store.privacy.policy') }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="photo">Photo</label>
                                    <input type="file" name="photo" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="text">Text</label>
                                    <textarea name="text" class="form-control" rows="5" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Add Privacy Policy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
