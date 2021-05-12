@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.masterclass.update', $masterclass->id) }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <input type="hidden" name="_method" value="put"/>
                    <div class="card-title">Masterclass Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Masterclass Name</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="name" value="{{ old('masterclass_title') ?? $masterclass->masterclass_title }}">
                            @if ($errors->has('name') )
                            <span style="color:red">
                                {{ $errors->first('name') }}
                            </span>
                            @endif

                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Speciality</div>
                        <div class="col-lg-8">
                        <select class="form-control form-select" name="speciality"  aria-label="">
                        @foreach($specialities as $speciality)
                          @if($speciality->speciality==$masterclass->speciality)
                                <option  value="{{$speciality->speciality}}" selected>{{$speciality->speciality}}</option>
                          @else
                                <option  value="{{$speciality->speciality}}" >{{$speciality->speciality}}</option>
                          @endif
                        @endforeach

                        </select>        
                            @if ($errors->has('speciality') )
                            <span style="color:red">
                                {{ $errors->first('speciality') }}
                            </span>
                            @endif
                        </div> 
                    </div>

            

                    <div class="form-group row">
                            <div class="col-lg-3">Add Masterclass video:</div>
                            <div class="col-lg-8">
                                    <div data-role="dynamic-fields">
                                    @foreach($masterclass->subclasses as $subclass)
                                        <div class="form-inline">
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="video_title[]" placeholder="title" value="{{old('name') ?? $subclass->video_title}}">
                                                <input type="file" name="videos[]" multiple />
                                                @if ($errors->has('videos') )
                                                <span style="color:red">
                                                    {{ $errors->first('videos') }}
                                                </span>
                                                @endif
                                                <p><small>Supported format: MP4</small></p>
                                                <textarea name="description[]" class="form-control" placeholder="Video Description">{{ old('description') ?? $subclass->description}}</textarea>
                                                @if ($errors->has('description') )
                                                <span style="color:red">
                                                    {{ $errors->first('description') }}
                                                </span>
                                                @endif
                                            </div>
                                            <button class="btn btn-danger" data-role="remove">
                                                <span class="glyphicon glyphicon-remove"></span>
                                            </button>
                                            <button class="btn btn-primary" data-role="add">
                                                <span class="glyphicon glyphicon-plus"></span>
                                            </button>
                                        </div>  <!-- /div.form-inline -->
                                        @endforeach
                                    </div>  <!-- /div[data-role="dynamic-fields"] -->
                                </div>  <!-- /div.col-md-12 -->
                            </div>  <!-- /div.row -->

                            <div class="form-group row">
                            <div class="col-lg-3">Add Curators</div>
                            <div class="col-lg-8">
                                    <div data-role="dynamic-fields">
                                    @foreach($masterclass->curators as $curator)

                                        <div class="form-inline">
                                            <div class="form-group">
                                            <select class="form-group form-select team" name="curators[]"  aria-label="">
                                                    @foreach($doctors as $doctor)
                                                       @if($curator->doctor_id == $doctor->id)                                                      
                                                            <option  value="{{$doctor->id}}" selected>{{$doctor->name}}</option>
                                                       @else
                                                           <option  value="{{$doctor->id}}" >{{$doctor->name}}</option>
                                                       @endif
                                                    @endforeach

                                            </select>  
                                            </div>
                                            <button class="btn btn-danger" data-role="remove">
                                                <span class="glyphicon glyphicon-remove"></span>
                                            </button>
                                            <button class="btn btn-primary" data-role="add">
                                                <span class="glyphicon glyphicon-plus"></span>
                                            </button>
                                        </div>  <!-- /div.form-inline -->
                                        @endforeach

                                    </div>  <!-- /div[data-role="dynamic-fields"] -->
                                </div>  <!-- /div.col-md-12 -->
                            </div>  <!-- /div.row -->                    
                    <input class="btn btn-primary" type="submit" value="Upload">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection