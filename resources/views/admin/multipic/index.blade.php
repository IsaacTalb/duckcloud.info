@extends('admin.admin_master')

@section('admin')

<div class="py-12">
    <div class="container">
        <h4 style="text-align:center; color:white; margin-bottom:2em;">Home — Portfolio Section </h4>
        <div class="row">

            <div class="col-md-8">
                <div class="card-group">
                    @foreach($images as $multi)
                    <div class="col-md-4 mt-5">
                        <div class="card">
                            <img src="{{ asset($multi->image) }}" alt="">
                            <div class="card-footer">
                                <!-- Add a form to submit the delete request -->
                                <form action="{{ route('delete.image', $multi->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger btn-sm float-right">Delete</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-header"> Multi Image </div>
                    <div class="card-body">
                        <form action="{{ route('store.image') }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="form-group">
                                <label for="exampleInputEmail1">Multi Image</label>
                                <input type="file" name="image[]" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" multiple="">
                                @error('image')
                                <span class="text-danger"> {{ $message }}</span>
                                @enderror
                            </div>
                            <button type="submit" class="btn btn-primary">Add Image</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

@endsection
