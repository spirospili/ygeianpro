@extends('admin.app')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.team.store') }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <div class="card-title">Teams Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Team Name</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="name" value="{{old('name')}}">
                            @if ($errors->has('name') )
                            <span style="color:red">
                                {{ $errors->first('name') }}
                            </span>
                            @endif

                        </div> 
                    </div>
                                        <div class="form-group row">
                        <div class="col-lg-3">Team Lead Name</div>
                        <div class="col-lg-8">
                        <select class="form-group form-select" name="lead_doctor_name"  aria-label="">
                        @foreach($doctors as $doctor)
                                @if($doctor->tags=="Top")
                                    <option  value="{{$doctor->id}}">{{$doctor->name}}</option>
                                @endif
                        @endforeach

                        </select>  
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

                            <option  value="{{$speciality->speciality}}">{{$speciality->speciality}}</option>
                    
                        @endforeach

                        </select>                            @if ($errors->has('speciality') )
                            <span style="color:red">
                                {{ $errors->first('speciality') }}
                            </span>
                            @endif
                        </div> 
                    </div>
                            <div class="form-group row">
                            <div class="col-lg-3">Add Team Members</div>
                            <div class="col-lg-8">
                                    <div data-role="dynamic-fields">
                                        <div class="form-inline">
                                            <div class="form-group">
                                            <select class="form-group form-select team" name="team_member[]"  aria-label="">
                                                    @foreach($doctors as $doctor)
                                                         @if($doctor->tags=="Regular")
                                                            <option  value="{{$doctor->id}}">{{$doctor->name}}</option>
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
                                    </div>  <!-- /div[data-role="dynamic-fields"] -->
                                </div>  <!-- /div.col-md-12 -->
                            </div>  <!-- /div.row -->
                        <div class="form-group row">
                            <div class="col-lg-3">Upload Logo</div>
                            <div class="col-lg-8">
                                <input type="file" name="logo" />
                                @if ($errors->has('logo') )
                                <span style="color:red">
                                    {{ $errors->first('logo') }}
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

<script>
$(function() {
    var rowIndex=0;
    // Remove button click
    $(document).on(
        'click',
        '[data-role="dynamic-fields"] > .form-inline [data-role="remove"]',
        function(e) {
            rowIndex--;
            e.preventDefault();
            $(this).closest('.form-inline').remove();
        }
    );
    // Add button click
    $(document).on(
        'click',
        '[data-role="dynamic-fields"] > .form-inline [data-role="add"]',
        function(e) {
            e.preventDefault();
            rowIndex++;
            var container = $(this).closest('[data-role="dynamic-fields"]');
            new_field_group = container.children().filter('.form-inline:first-child').clone();
            // new_field_group.find('.team').attr({name:'team_member[]'});
            new_field_group.find('input').each(function(){
                $(this).val('');
            });
            
            container.append(new_field_group);
        }
    );
});
</script>			
@endsection
