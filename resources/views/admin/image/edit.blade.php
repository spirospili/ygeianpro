@extends('admin.app')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route("admin.image.update", $image->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put" />
                    <div class="card-title">Image Upload Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Image Title</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{ old('title') ?? $image->name }}">
                            @if ($errors->has('title') )
                            <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Select Doctor</div>
                        <div class="col-lg-8">
                            <select name="doctor" class="form-control">
                                <option value="">Select Doctor</option>
                                @foreach($doctors as $doctor)
                                <option value="{{ $doctor->id }}"  {{ $image->doctor_id == $doctor->id  ? "selected"  : ""  }}>{{ $doctor->name }}</option>
                                @endforeach
                            </select>
                            @if ($errors->has('doctor') )
                            <span style="color:red">
                                {{ $errors->first('doctor') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Tags (Add tags by comma seprated)</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="tags" value="{{ old('tags') ?? $image->tags }}" placeholder="trending, uploads, watch">
                            @if ($errors->has('tags') )
                            <span style="color:red">
                                {{ $errors->first('tags') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Video Description</div>
                        <div class="col-lg-8">
                            <textarea name="description" class="form-control">{{ old('description') ?? $image->description }}</textarea>
                            @if ($errors->has('description') )
                            <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload Image</div>
                        <div class="col-lg-8">
                            <input type="file" name="image" />
                            @if ($errors->has('image') )
                            <span style="color:red">
                                {{ $errors->first('image') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    
                    <input class="btn btn-primary" type="submit" value="Upload Image">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection