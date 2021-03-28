@extends('admin.app')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.video.update', $video->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put" />
                    <div class="card-title">Video Upload Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Video Title</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{ old('title') ?? $video->name }}">
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
                                <option {{ $video->doctor_id == $doctor->id ? "selected" :"" }} value="{{ $doctor->id }}">{{ $doctor->name }}</option>
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
                            <input type="text" class="form-control" name="tags" value="{{ old('tags') ?? $video->tags }}" placeholder="trending, uploads, watch">
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
                            <textarea name="description" class="form-control">{{ old('description') ?? $video->description }}</textarea>
                            @if ($errors->has('description') )
                            <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload Video</div>
                        <div class="col-lg-8">
                            <input type="file" name="video" />
                            @if ($errors->has('video') )
                            <span style="color:red">
                                {{ $errors->first('video') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    
                    <input class="btn btn-primary" type="submit" value="Update Video">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection