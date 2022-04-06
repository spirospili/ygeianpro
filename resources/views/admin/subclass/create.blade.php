@extends('admin.app')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <form id="video_pub" method="POST" action="{{ route('admin.subclass.store') }}" enctype="multipart/form-data">
                        {{ @csrf_field() }}
                        <div class="card-title">Subclass Upload Setting</div>
                        

                        <div class="form-group row">
                            <div class="col-lg-3">Subclass Title</div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" name="title" value="{{old('title')}}" required>
                                @if ($errors->has('title') )
                                    <span style="color:red">
                                {{ $errors->first('title') }}
                            </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-lg-3">Select Masterclass:</div>
                            <div class="col-lg-8">
                                <select name="masterclass" class="form-control" required>
                                    <option value="">Select Masterclass</option>
                                    @foreach($Masterclasses as $Masterclass)
                                        <option value="{{ $Masterclass->id }}" >{{ $Masterclass->masterclass_title }}</option>
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
                                <textarea name="description" class="form-control" required>{{ old('description') }}</textarea>
                                @if ($errors->has('description') )
                                    <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                                @endif
                                <p><small>Total 1000 words</small></p>
                            </div>
                        </div>

                        <div class="form-group row" id="formatSelector" >
                            <div class="col-lg-3">Format</div>
                            <div class="col-lg-8">
                                <select class="form-control" id="selectorId" name="format" value="{{old('format')}}" onClick="runDivEnabler()" required>
                                    <option value="default" >Please choose an option</option>
                                    <option value ="file" >File</option>
                                    <option value ="video" >Video</option>
                                </select>
                                @if ($errors->has('format'))
                                     <span style="color:red">
                                     {{ $errors->first('format')}}
                                        </span>
                                        @endif
                            </div>
                        </div>

                        <div class="form-group row disabledbutton uploadFileDiv">
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

                        

                        <div class="form-group row disabledbutton videoCategoryDiv">
                            <div class="col-lg-3">Video Category:</div>
                            <div class="col-lg-8">
                                <select class="form-control" name="category" value="{{old('category')}}">
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


                        <div class="form-group row disabledbutton videoLinkDiv">
                            <div class="col-lg-3">Video Link:</div>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" name="video" value="{{old('video')}}">
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

                        <input class="btn btn-primary" type="submit" value="Upload">

                    </form>

                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script>

    <script type="text/javascript">

    function runDivEnabler(){
        // option Value is fetching the value of the selected option 
        var optionValue = $('#selectorId').find(":selected").val();
        console.log(optionValue);
        // If the selected option is file it removes the calss from file div and 
        // confirms that video category div still has the class disabledbutton
        // so that the video div remains disabled and similar is the case for all other option values
        if(optionValue=="file")
        {
            $('.uploadFileDiv').removeClass('disabledbutton');
            if(!($('.videoCategoryDiv').hasClass('disabledbutton')))
            {
                $('.videoCategoryDiv').addClass('disabledbutton');
                $('.videoLinkDiv').addClass('disabledbutton');

            }
        }
        if(optionValue=="video")
        {
            $('.videoCategoryDiv').removeClass('disabledbutton');
            $('.videoLinkDiv').removeClass('disabledbutton');
            if(!($('.uploadFileDiv').hasClass('disabledbutton')))
            {
                $('.uploadFileDiv').addClass('disabledbutton')
            }
        }
    }

   



        (function() {

            var progress = $('.progress');
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            $('#video_pub').ajaxForm({
                beforeSend: function() {
                    progress.removeClass('d-none');
                    status.empty();
                    var percentVal = '0%';
                    var posterValue = $('input[name=publication]').fieldValue();
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                uploadProgress: function(event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                success: function() {
                    var percentVal = 'Wait, Saving';
                    bar.width(percentVal)
                    percent.html(percentVal);
                },
                complete: function(xhr) {
                    status.html(xhr.responseText);
                    window.location.pathname = "admin/video";
                }
            });

        })();
    </script>
@endsection