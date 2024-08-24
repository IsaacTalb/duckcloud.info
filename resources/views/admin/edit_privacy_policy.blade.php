@extends('admin.admin_master')

@section('admin')
    <div class="py-12">
        <div class="container">
            <h4>Edit Privacy Policy</h4>
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <form action="{{ url('admin/privacy-policy/update/'.$privacyPolicy->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <input type="hidden" name="old_image" value="{{ $privacyPolicy->photo }}">
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" class="form-control" value="{{ $privacyPolicy->title }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="photo">Photo</label>
                                    <input type="file" name="photo" class="form-control">
                                    <img src="{{ asset($privacyPolicy->photo) }}" style="width: 100px; height: 100px;">
                                </div>
                                <div class="form-group">
                                    <label for="text">Text</label>
                                    <textarea name="text" class="form-control" rows="5" required>{{ $privacyPolicy->text }}</textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Update Privacy Policy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
