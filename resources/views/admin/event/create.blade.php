@extends('admin.app')

@section('content')
 
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.event.store') }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <div class="card-title">Events Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Name</div>
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
                        <div class="col-lg-3">Description</div>
                        <div class="col-lg-8">
                            <textarea name="description" class="form-control" cols="30" rows="10">{{ old('description') }}</textarea>
                            @if ($errors->has('description') )
                            <span style="color:red">
                                {{ $errors->first('description') }}
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
                            <p><small>Supported format: JPG, JPEG, PNG and MAX SIZE 2048</small></p>
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Start Date</div>
                        <div class="col-lg-8">
                            <input type="date" class="form-control" id="start_date" name="start_date" min="{{date('Y-m-d')}}">
                            @if ($errors->has('start_date') )
                            <span style="color:red">
                                {{ $errors->first('start_date') }}
                            </span>
                            @endif
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">End Date</div>
                        <div class="col-lg-8">
                            <input type="date" class="form-control" disabled id="end_date" name="end_date">
                            @if ($errors->has('end_date') )
                            <span style="color:red">
                                {{ $errors->first('end_date') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    <script type="text/javascript">
                        const selectElement = document.querySelector('#start_date');
                        selectElement.addEventListener('change', (event) => {
                            var today = new Date(event.target.value);
                            var dd = today.getDate();
                            var mm = today.getMonth()+1; //January is 0!
                            var yyyy = today.getFullYear();
                            if(dd<10){
                                dd='0'+dd
                            } 
                            if(mm<10){
                                mm='0'+mm
                            } 
                            today = yyyy+'-'+mm+'-'+dd;
                            document.getElementById("end_date").setAttribute("min", today);
                            document.getElementById("end_date").removeAttribute("disabled");
                        });
                    </script>

                    <div class="form-group row">
                        <div class="col-lg-3">Location</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="location" value="">
                            @if ($errors->has('location') )
                            <span style="color:red">
                                {{ $errors->first('location') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                    
                    <input class="btn btn-primary" type="submit" value="Upload">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
					
@endsection