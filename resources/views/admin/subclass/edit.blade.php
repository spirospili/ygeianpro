@extends('admin.app')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.subclass.update', $video->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put" />
                    <div class="card-title">Subclass Upload Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Subclass Title</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="title" value="{{ old('title') ?? $video->video_title }}">
                            @if ($errors->has('title') )
                            <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Select Masterclass</div>
                        <div class="col-lg-8">
                            <select name="masterclass" class="form-control">
                                <option value="">Select Masterclass</option>
                                @foreach($masterclasses as $masterclass)
                                <option {{ $video->masterclass_id == $masterclass->id ? "selected" :"" }} value="{{ $masterclass->id }}">{{ $masterclass->masterclass_title }}</option>
                                @endforeach
                            </select>
                            @if ($errors->has('masterclass') )
                            <span style="color:red">
                                {{ $errors->first('masterclass') }}
                            </span>
                            @endif
                        </div> 
                    </div>


                    <div class="form-group row">
                        <div class="col-lg-3">Description</div>
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
                            <div class="col-lg-3">Format</div>
                            <div class="col-lg-8">
                                <select class="form-control" name="format" value="{{old('format')}}" required>
                                    <option value="">Please choose an option</option>
                                    <option>File</option>
                                    <option>Video</option>
                                </select>
                                @if ($errors->has('format'))
                                     <span style="color:red">
                                     {{ $errors->first('format')}}
                                        </span>
                                        @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-3">Upload File</div>
                            <div class="col-lg-8">
                                <input type="file" name="file" />
                                @if ($errors->has('file') )
                                <span style="color:red">
                                    {{ $errors->first('file') }}
                                </span>
                                @endif
                            <p><small>Supported format: PDF, Word, ppt. etc</small></p>
                            </div> 
                        </div>

                    <div class="form-group row">
                            <div class="col-lg-3">Video Category:</div>
                            <div class="col-lg-8">
                                <select class="form-control" name="category" value="{{old('category')}}" required>
                                    <option value="">Please choose an option</option>
                                    <option value="youtube">Youtube</option>
                                    <option value="vimeo">Vimeo</option>
                                </select>
                                @if ($errors->has('category'))
                                     <span style="color:red">
                                     {{ $errors->first('category')}}
                                        </span>
                                        @endif
                            </div>
                        </div>

                    <div class="form-group row">
                            <div class="col-lg-3">Video Link:</div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" name="video" value="{{old('video')}}" required>
                                @if ($errors->has('title') )
                                    <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                        <div class="col-lg-3">Upload Thumbnail</div>
                            <div class="col-lg-8">
                                <input type="file" name="thumbnail" />
                                @if ($errors->has('thumbnail') )
                                <span style="color:red">
                                    {{ $errors->first('thumbnail') }}
                                </span>
                                @endif
                            <p><small>Supported format: JPG, JPEG, PNG</small></p>
                        </div> 
                    </div>
                    
                    <input class="btn btn-primary" type="submit" value="Update Video">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection