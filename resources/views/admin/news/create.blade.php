@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.news.store') }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <div class="card-title">News Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Title</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{old('title')}}">
                            @if ($errors->has('title') )
                            <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Content</div>
                        <div class="col-lg-8">
                            <textarea name="content" class="form-control">{{ old('content') }}</textarea>
                            @if ($errors->has('content') )
                            <span style="color:red">
                                {{ $errors->first('content') }}
                            </span>
                            @endif
                            <p><small>Total 1000 words</small></p>
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
                            <p><small>Supported format: JPG, JPEG, PNG</small></p>
                        </div> 
                    </div>
                    
                    <input class="btn btn-primary" type="submit" value="Upload">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection